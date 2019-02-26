import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  item;

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit() {
    this.getItem();
  }

  getItem(): void {
    let itemId = this.route.snapshot.paramMap.get('id');
    this.itemService.getSingleItem(itemId)
      .subscribe(response => {
        this.item = response;
      });
  }
}
