package com.example.backend.mapper;

import com.example.backend.dto.PetOwnerOfferDTO;
import com.example.backend.entity.PetOwnerOffer;
import com.example.backend.entity.Picture;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PetOwnerOfferMapper {
    @Mapping(source = "user.id", target="userId")
    @Mapping(source = "pictures", target = "picturePaths")
    PetOwnerOfferDTO mapToDto(PetOwnerOffer petOwnerOffer);
    PetOwnerOffer mapToEntity(PetOwnerOfferDTO petOwnerOfferDTO);

    @IterableMapping(qualifiedByName = "mapPictureToUrl")
    List<String> mapPicturesToUrls(List<Picture> pictures);

    @Named("mapPictureToUrl")
    default String mapPictureToUrl(Picture picture) {
        return picture != null ? picture.getFilepath() : null;
    }
}
