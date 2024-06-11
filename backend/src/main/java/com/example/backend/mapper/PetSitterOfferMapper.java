package com.example.backend.mapper;

import com.example.backend.dto.PetSitterOfferDTO;
import com.example.backend.entity.PetSitterOffer;
import com.example.backend.entity.Picture;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PetMapper.class})
public interface PetSitterOfferMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "pets", ignore = true)
    @Mapping(source = "userId", target = "user.id")
    PetSitterOffer toEntity(PetSitterOfferDTO offerDTO);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "pictures", target = "picturePaths")
    @Mapping(source = "pets", target = "pets")
    PetSitterOfferDTO toDTO(PetSitterOffer offerEntity);


    @IterableMapping(qualifiedByName = "mapPictureToUrl")
    List<String> mapPicturesToUrls(List<Picture> pictures);

    @Named("mapPictureToUrl")
    default String mapPictureToUrl(Picture picture) {
        return picture != null ? picture.getFilepath() : null;
    }


}
