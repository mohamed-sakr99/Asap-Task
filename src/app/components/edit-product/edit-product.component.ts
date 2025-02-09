import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProduct } from '../../models/product';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor,MatCardModule,MatFormFieldModule ,MatInputModule,MatButtonModule,MatSelectModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;
  productID!: number;
  singleProduct!: IProduct;
  categoriesList: any[] = [];
  imagePreview: any = '';

  private productService = inject(ProductsService);
  private FB = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toaster = inject(ToastrService);


  constructor() {
    this.getProductIDFromParams()
    this.createForm();
  }

  ngOnInit(): void {
    this.getSingleProductByID()
    this.getCategoriesList();
  }


  
  // get Form Controls
  get EditProductFormControls() {
    return this.editProductForm.controls
  }
  // get ID From Params During Routes
  getProductIDFromParams() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.productID = +params['id']
      console.log(this.productID)
    })
  }

  // initialization Of editProductForm 
  createForm() {
    this.editProductForm = this.FB.group({
      id: [''],
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    })
  }


  // get Single product BY ID
  getSingleProductByID() {
    if (this.productID) {
      this.productService.getSingleProduct(this.productID).subscribe((res: IProduct) => {
        this.singleProduct = res;
        console.log("dd", res)
        this.patchFormsValues()
      })
    }

  }
  //set value of Edited Data In My Form
  patchFormsValues() {
    this.editProductForm.patchValue({
      id: this.singleProduct?.id,
      title: this.singleProduct?.title,
      price: this.singleProduct?.price,
      category: this.singleProduct?.category,
      description: this.singleProduct?.description,
      image: this.singleProduct?.image
    });
    this.imagePreview = this.singleProduct?.image || '';

  }

  updateImagePreview() {
    this.imagePreview = this.editProductForm.get('image')?.value;
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result;
        this.editProductForm.patchValue({ image: this.imagePreview });
      };
      reader.readAsDataURL(file);
    }
  }
  // Add New Product OR Update Product
  submitForm() {
    if (!this.productID ) {
      this.productService.AddNewProduct(this.editProductForm.value).subscribe((res: IProduct) => {
        this.toaster.success('product addes successfuly')
        this.router.navigate(['/product'])
      })
    } else {
      this.productService.updateProduct(this.productID, this.editProductForm.value).subscribe((res: IProduct) => {
        this.toaster.success('product Updated suuccessfly')
        this.router.navigate(['/product'])

      })
    }
  }


  //get List Of Categories of Product
  getCategoriesList() {
    this.productService.getProductCategories().subscribe((res: any) => {
      this.categoriesList = res;
      console.log("ddd", res)
    })
  }
}
