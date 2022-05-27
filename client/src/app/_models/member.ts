import { Photo } from "./photo";


export interface Member {
        id: number;
        username: string;
        age: number;
        photoUrl: string;
        knownAs: string;
        createDate: Date;
        lastActive: Date;
        gender: string;
        introduction: string;
        lookingFor: string;
        interests: string;
        country: string;
        city:string;
        photos: Photo[];
}
