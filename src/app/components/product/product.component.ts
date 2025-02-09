import { Component, inject, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-product',
  imports: [RouterLink, MatTableModule,  MatPaginatorModule,MatSortModule,MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  displayedColumns: string[] = ['ID', 'Image', 'Title', 'category', 'description', 'price', 'rating', 'action'];

  dataSource = new MatTableDataSource<IProduct >();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  
  productList: IProduct[] = [];

  private productService = inject(ProductsService)
  private toaster = inject(ToastrService)

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getProductList()

  }


  // get product list method
  getProductList() {
    this.productService.getAllProduct().subscribe((res: IProduct[]) => {
      this.productList = res;
      this.dataSource.data = res;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
      console.log("resss", res)
    })
  }

  //delete single product from list
  deleteSingleProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((res: IProduct) => {
      this.toaster.success('product deleted successfuly')
      this.getProductList()
    }, error => {
      this.toaster.error('product not deleted successfuly')
    })
  }

}
