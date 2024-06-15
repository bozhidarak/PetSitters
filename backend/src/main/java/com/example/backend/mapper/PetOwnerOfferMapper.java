package com.example.backend.mapper;

import com.example.backend.dto.PetOwnerOfferDTO;
import com.example.backend.entity.PetOwnerOffer;
import com.example.backend.entity.Picture;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PetMapper.class})
public interface PetOwnerOfferMapper {
    @Mapping(source = "user.id", target="userId")
    @Mapping(source = "pictures", target = "picturePaths")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "user.email", target = "userEmail")
    @Mapping(source = "user.profilePic", target = "userProfilePic")
    PetOwnerOfferDTO mapToDto(PetOwnerOffer petOwnerOffer);

    @Mapping(source = "pets", target = "pets", ignore = true)
    @Mapping(source = "userId", target="user.id")
    PetOwnerOffer mapToEntity(PetOwnerOfferDTO petOwnerOfferDTO);

    @IterableMapping(qualifiedByName = "mapPictureToUrl")
    List<String> mapPicturesToUrls(List<Picture> pictures);

    @Named("mapPictureToUrl")
    default String mapPictureToUrl(Picture picture) {
        return picture != null ? picture.getFilepath() : null;
    }
}
