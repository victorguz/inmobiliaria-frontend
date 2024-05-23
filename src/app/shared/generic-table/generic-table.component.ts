import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { GenericTableColumn } from '../../interfaces/generic-table.interfaces';

@Component({
  selector: 'generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Evento al hacer click en una fila cuando la selección está activada
   */
  @Output() clickRow = new EventEmitter<any[]>();

  /**
   * Activar seleccion de filas
   */
  @Input() activateSelection: boolean = false;

  /**
   * Activar selección multiple de filas
   */
  @Input() multipleSelection: boolean = false;

  /**
   * Tamaños de página
   */
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  /**
   * Columnas configuradas
   */
  @Input() columns?: GenericTableColumn<any>[];

  /**
   * Datos de la tabla
   */
  @Input() items: any[] = [];

  /**
   * Valor a buscar en la tabla
   */
  @Input() valueSearch: string = '';

  /**
   * Data filtrada
   */
  @Output() filteredData = new EventEmitter<any[]>();

  /**
   * orientación de los botones de acción
   */
  @Input() actionsOrientation: 'start' | 'end' | 'center' = 'center';

  /**
   * objetos seleccionados previamente
   */
  @Input() selectedItems: any[] = [];

  displayedColumns: any[] = [];
  dataSource = new MatTableDataSource<Set<any>>();
  selected = new Set<any>();
  showTable: boolean = false;

  constructor(
    private paginatorIntl: MatPaginatorIntl,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['valueSearch']) {
      this.applyFilter();
    }
    if (changes['items'] || changes['columns'] || changes['actions']) {
      this.setData();
      this.setColumns();
    }
    if (changes['selectedItems']) {
      this.selected = new Set<any>(this.selectedItems);
    }
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.showTable = true;
    this.cdRef.detectChanges();
  }

  /**
   * Si no viene el parametro de columns, se llenará
   * columns desde el parámetro "data" utilizando los
   * nombres de los campos automaticamente.
   */
  setColumns() {
    this.columns = this.columns ?? [];
    if (this.columns.length == 0 && this.items.length > 0) {
      for (const key in this.items[0]) {
        if (
          Object.hasOwn(this.items[0], key) &&
          !key.toLowerCase().includes('_id')
        ) {
          this.columns.push({
            name: key,
            title: (key),
          });
        }
      }
    }
    this.displayedColumns =
      this.columns?.map((value, index) => {
        this.columns![index].maxLength = this.columns![index].maxLength ?? 40;
        return value.name;
      }) || [];
  }

  /**
   * Setea los datos en el datasource de la tabla
   */
  setData() {
    this.dataSource = new MatTableDataSource<any>(this.items);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    this.valueSearch = this.valueSearch
      ? this.valueSearch.trim().toLowerCase()
      : '';
    this.dataSource.filter = this.valueSearch;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.filteredData.emit(this.dataSource.filteredData);
  }

  selectRow(row: any) {
    if (this.multipleSelection) {
      if (this.selected.has(row)) {
        this.selected.delete(row);
      } else {
        this.selected.add(row);
      }
    } else {
      if (this.selected.has(row)) {
        this.selected.clear();
      } else {
        this.selected.clear();
        this.selected.add(row);
      }
    }
    this.clickRow.emit(Array.from(this.selected));
  }

  render(column: GenericTableColumn<any>, row: any) {
    let element: any = {};
    let result: any = '';
    for (const key in row) {
      if (Object.hasOwn(row, key)) {
        element[key] = row[key] ? row[key] : '';
      }
    }
    let value = element[column.name as any];
    if (column.render) {
      result = column.render(row);
    } else if (typeof (value) =="string" || isNaN(Number(value))) {
      result = value;
    } else if (!isNaN(Number(value))) {
      result = Number(value);
      result = result == Infinity ? value + '' : result;
    } else {
      result = JSON.stringify(value);
    }
    result = result + ''; //Convertir en string
    result =
      result.length > column.maxLength!
        ? result.substring(0, column.maxLength) + '...'
        : result;
    return result;
  }

  getTextClass(column: GenericTableColumn<any>, row: any) {
    return {
      'text-break': this.render(column, row).length > 43,
      'text-wrap': this.render(column, row).length > 20,
      'text-nowrap': this.render(column, row).length <= 20,
      'cell-html': column.renderHTML,
    };
  }

  toString(value: any) {
    return String(value);
  }

  sortData(sort: Sort) {
    const data = this.items.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return compare(a[sort.active], b[sort.active], isAsc);
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
