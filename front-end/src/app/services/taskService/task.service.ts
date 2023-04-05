import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from "src/app/interfaces/ITask";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  private readonly baseUrl:string = "https://monhseapi.azurewebsites.net/api";
  constructor(private readonly httpService: HttpClient) { }

  public getAll = (): Observable<ITask[]> => {
    return this.httpService.get<ITask[]>(`${this.baseUrl}/Task`);
  }

  public get = (id: number): Observable<ITask> => {
    return this.httpService.get<ITask>(`${this.baseUrl}/Task/${id}`);
  }

  public create = (data: ITask): Observable<ITask> => {
    return this.httpService.post<ITask>(`${this.baseUrl}/Task`, {
      name: data.name,
      description: data.description
    });
  }

  public update = (data: ITask, id: number): Observable<ITask> => {
    return this.httpService.put<ITask>(`${this.baseUrl}/Task/${id}`, {
      name: data.name,
      description: data.description,
      completed: data.completed
    });
  }

  public delete = (id: number): Observable<boolean> => {
    return this.httpService.delete<boolean>(`${this.baseUrl}/Task/${id}`);
  }

  public getCompletedTasks = (): Observable<ITask[]> => {
    return this.httpService.get<ITask[]>(`${this.baseUrl}/Task/completed`);
  }
}
