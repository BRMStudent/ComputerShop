import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ComboSet, ComboSetItem, ComboSetOutput } from 'src/model/comboSet';

@Injectable({
  providedIn: 'root'
})
export class ComboSetService {

  constructor(private http: HttpClient) { }
  private endPoints = "https://localhost:7157/api/ComboSets"
  private itemEndPoints = "https://localhost:7157/api/ComboSets/items"

  async getComboSets(approve?: boolean) {
    if (approve != null) {
      return await firstValueFrom(this.http.get<ComboSetOutput[]>(this.endPoints + "?approve=" + approve))
    }
    return await firstValueFrom(this.http.get<ComboSetOutput[]>(this.endPoints))
  }

  async getComboSet(id: number, approve?: boolean) {
    if (approve != null) {
      return await firstValueFrom(this.http.get<ComboSetOutput[]>(this.endPoints + "/" + id + "?approve=" + approve))
    }
    return await firstValueFrom(this.http.get<ComboSetOutput[]>(this.endPoints + "/" + id))
  }

  async addComboSet(comboSet: ComboSet) {
    return await firstValueFrom(this.http.post<ComboSet>(this.endPoints, comboSet))
  }

  async updateComboSet(id: number, comboSet: ComboSet) {
    return await firstValueFrom(this.http.put<ComboSet>(this.endPoints + "/" + id, comboSet))
  }

  async deleteComboSet(id: number) {
    return await firstValueFrom(this.http.delete(this.endPoints + "/" + id))
  }

  async addComboSetItem(comboSetItem: ComboSetItem) {
    return await firstValueFrom(this.http.post<ComboSetItem>(this.itemEndPoints, comboSetItem))
  }

  async updateComboSetItem(id: number, comboSetItem: ComboSetItem) {
    return await firstValueFrom(this.http.put<ComboSetItem>(this.itemEndPoints + "/" + id, comboSetItem))
  }

  async deleteComboSetItem(id: number) {
    return await firstValueFrom(this.http.delete(this.itemEndPoints + "/" + id))
  }

}
