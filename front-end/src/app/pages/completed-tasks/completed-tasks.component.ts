import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/interfaces/ITask';
import { TaskServiceService } from 'src/app/services/taskService/task.service';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
})
export class CompletedTasksComponent implements OnInit {
  public tasksCompleted: ITask[] = [];
  constructor(private readonly taskService: TaskServiceService) {}

  public ngOnInit(): void {
    this.getCompletedTasks();
  }

  private getCompletedTasks = (): void => {
    this.taskService.getCompletedTasks().subscribe({
      next: (res) => {
        this.tasksCompleted = res;
      },

      error: (err) => {
        alert('Nâo foi posssível buscar as tarefas completas');
      },
    });
  };

  public onRestore = ({ name, description, id }: ITask): void => {
    const params = {
      name,
      description,
      completed: false,
    };
    this.taskService.update(params, id!).subscribe({
      next: (res) => {
        alert('Tarefa Restaurada');
        this.getCompletedTasks();
      },

      error: (err) => {
        alert('Não foi possível excluir a tarefa');
      },
    });
  };

  public onDelete = (id: number): void => {
    const confirmMessage = confirm('Deseja Excluir a tarefa ?');
    if (confirmMessage) this.deleteTask(id);
  };

  private deleteTask = (id: number): void => {
    this.taskService.delete(id).subscribe({
      next: (res) => {
        alert('Tarefa Deletada');
        this.getCompletedTasks();
      },

      error: (err) => {
        alert('Não foi possível deletar a tarefa');
      },
    });
  };
}
