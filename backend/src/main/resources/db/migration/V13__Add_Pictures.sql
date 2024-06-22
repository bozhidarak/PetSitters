UPDATE users
SET profile_pic = 'https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/DC_Aug23_SingledOut_BlogHeader.1).2308070829127.jpg'
WHERE id = 1;

UPDATE users
SET profile_pic = 'https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/istockphoto-1333694863-612x612.jpg'
WHERE id = 1;

INSERT INTO picture (filepath, sitter_offer_id, owner_offer_id) VALUES
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/gelb-golden-retriever-im-wasser.jpg', null, 1),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/how-to-make-your-dog-happy-600x400.jpg', null, 1),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/Golden4.jpg', null, 1),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/image-53908-800.jpg', null, 2),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/Cat_August_2010-4.jpg', null, 2),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/european-shorthair-8601492_640.jpg', null, 2),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/punti-migliori-dove-accarezzare-gatto-1024x683.jpg', null, 2),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/how-to-make-your-dog-happy-600x400.jpg', 1, null),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/training-golden-retrievers.jpg', 1, null),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/istockphoto-919045184-612x612.jpg', 2, null),
('https://pet-sitters-storage.s3.eu-central-1.amazonaws.com/adobestock_66233948.jpeg', 2, null);
