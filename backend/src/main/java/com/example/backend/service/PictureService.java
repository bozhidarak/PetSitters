package com.example.backend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.backend.entity.PetOwnerOffer;
import com.example.backend.entity.PetSitterOffer;
import com.example.backend.entity.Picture;
import com.example.backend.repository.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.InvalidParameterException;

@Service
public class PictureService {
    @Value("${application.bucket.name}")
    private String bucketName;
    private final PictureRepository pictureRepository;
    private final AmazonS3 s3Client;

    @Autowired
    public PictureService(PictureRepository pictureRepository, AmazonS3 s3Client) {
        this.pictureRepository = pictureRepository;
        this.s3Client = s3Client;
    }

    public Picture addPictureToOffer(MultipartFile pictureFile,
                                     PetSitterOffer petSitterOffer, PetOwnerOffer petOwnerOffer) {
        if(petSitterOffer == null && petOwnerOffer == null) {
            throw new InvalidParameterException("You must provide an offer for adding picture");
        }

        Picture newPicture = new Picture();
        String pictureUrl = uploadPictureToBucket(pictureFile);
        newPicture.setFilepath(pictureUrl);

        if (petSitterOffer != null) {
            newPicture.setPetSitterOffer(petSitterOffer);
            petSitterOffer.getPictures().add(newPicture);
        }
        else {
            newPicture.setPetOwnerOffer(petOwnerOffer);
           petOwnerOffer.getPictures().add(newPicture);
        }
        return pictureRepository.save(newPicture);
    }

    public String uploadPictureToBucket(MultipartFile mPartFile) {
        File pictureForUpload = convertMultipartFileToFile(mPartFile);
        String filename = System.currentTimeMillis() + mPartFile.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName, filename, pictureForUpload));
        pictureForUpload.delete();
        return String.format("https://%s.s3.amazonaws.com/%s", bucketName, filename);
    }
    public void deleteFile(String filepath) {
        if (filepath.contains("/")) {
            String[] filepathParts = filepath.split("/");
            String fileName = filepathParts[filepathParts.length - 1];
            s3Client.deleteObject(bucketName, fileName);
        }
    }

    private File convertMultipartFileToFile(MultipartFile mpartFile) {
        File convertedFile = new File(mpartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(mpartFile.getBytes());
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return convertedFile;
    }
}
