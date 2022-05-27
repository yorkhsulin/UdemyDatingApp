import { MembersService } from './../../_services/members.service';
import { Member } from 'src/app/_models/member';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member:Member
  constructor(private membersService:MembersService , private route:ActivatedRoute) { }

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions =[
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }

    ]



  }
  getImage():NgxGalleryImage[]{
    const imgeUrls = [];
    for (let photo of this.member.photos)
    {

      imgeUrls.push({
        small:photo?.url,
        medium:photo?.url,
        big:photo?.url
      })
    }
    return imgeUrls;
  }

  loadMember(){
    this.membersService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member=>{
      this.member = member;
      
      this.galleryImages = this.getImage();
    });

  }

}
