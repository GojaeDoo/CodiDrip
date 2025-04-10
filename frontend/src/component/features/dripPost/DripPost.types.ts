export interface Profile {
  id: string;
  name: string;
  height: number;
  weight: number;
  image_url: string;
  profile_image_url: string;
}

export interface DripPostPresenterProps {
  imageUrl: string;
  profileImageUrl: string;
  name: string;
  height: number;
  weight: number;
  cardNumber?: number;
}
