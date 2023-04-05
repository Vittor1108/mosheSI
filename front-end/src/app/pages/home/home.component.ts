import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from 'src/app/interfaces/ITask';
import { TaskServiceService } from 'src/app/services/taskService/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
  public tasksList: ITask[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskServiceService
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.getAllTasks();
  }

  public clearValues = (): void => {
    this.form.reset();
  };

  public onSubmit = (): void => {
    this.taskService.create(this.form.value).subscribe({
      next: (res) => {
        this.getAllTasks();
        this.clearValues();
      },

      error: (err) => {
        alert('Não foi possível criar as tarefas');
      },
    });
  };

  public getAllTasks = (): void => {
    this.taskService.getAll().subscribe({
      next: (res) => {
        this.tasksList = res;
      },

      error: (err) => {
        alert('Não foi possível buscar as tarefas');
      },
    });
  };

  public deleteTask = (id: number): void => {
    this.taskService.delete(id).subscribe({
      next: (res) => {
        this.getAllTasks();
      },
      error: (err) => {
        alert('Não foi possível deletar a tarefa');
      },
    });
  };

  public onDelete = (id: number): void => {
    const confirmMessage = confirm('Deseja Excluir a tarefa?');
    if (confirmMessage) {
      this.deleteTask(id);
    }
  };

  public onCompleted = (data: ITask): void => {
    const parms = {
      name: data.name,
      description: data.description,
      completed: true,
    };

    this.taskService.update(parms, data.id!).subscribe({
      next: (res) => {
        this.getAllTasks();
      },

      error: (err) => {},
    });
  };
}
