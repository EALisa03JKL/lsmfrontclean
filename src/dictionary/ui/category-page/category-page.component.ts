import { HttpClient } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { DictionaryApiService } from '../../infrastructure/dictionary-api.service';
import { DictionaryApiCategory } from '../../infrastructure/models/dictionary-api.model';
import { DictionaryContent } from '../../domain/dictionary.model';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css',
})
export class CategoryPageComponent implements OnInit {
  _dictionaryApiService = inject(DictionaryApiService);
  _httpClient = inject(HttpClient);

  @Input() cat!: string;

  // inicializamos array de CategoryPage
  category: DictionaryContent[] = [];

  ngOnInit() {
    const formatCategory = (cat: string) => {
      return cat
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('-');
    };

    const category: DictionaryApiCategory = {
      category: formatCategory(this.cat),
    };
    this._dictionaryApiService.getContent(category).subscribe((data) => {
      this.category = data;
      // console.log(this.category);
    });
  }
}
