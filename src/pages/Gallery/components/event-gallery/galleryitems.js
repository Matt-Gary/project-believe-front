import image1 from '../../../../assets/home-page-image-1.webp';
import image2 from '../../../../assets/about-page-image-1.webp';
import image3 from '../../../../assets/about-page-image-2.webp';

export const galleryItems = [
    { id: 1, imageMain: image1, title: 'Galeria 1', date: '2023-01-01', images: [image1, image2] },
    { id: 2, imageMain: image2, title: 'Galeria 2', date: '2023-02-01',images: [image2, image1] },
    { id: 3, imageMain: image3, title: 'Galeria 3', date: '2023-03-01', images: [image3, image2]  },
    { id: 4, imageMain: image1, title: 'Galeria 4', date: '2023-04-01', images: [image1, image3]  },
];

export default galleryItems;