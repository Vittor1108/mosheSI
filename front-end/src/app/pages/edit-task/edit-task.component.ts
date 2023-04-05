import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from 'src/app/interfaces/ITask';
import { TaskServiceService } from 'src/app/services/taskService/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  public form: FormGroup;
  public tasksList: ITask[];
  private taskId: number;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly taskService: TaskServiceService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.activatedRoute.params.subscribe(
      (params) => (this.taskId = params['id'])
    );
    this.getTask();
  }

  private getTask = (): void => {
    this.taskService.get(Number(this.taskId)).subscribe({
      next: (res) => {
        this.form.controls['name'].setValue(res.name);
        this.form.controls['description'].setValue(res.description);
      },

      error: (err) => {
        alert('Não foi possível buscar os dados da tarefa');
        this.route.navigate(['']);
      },
    });
  };

  public onSubmit = (): void => {
    this.taskService.update(this.form.value, Number(this.taskId)).subscribe({
      next: (res) => {
        alert('Tarefa atualizada');
      },

      error: (err) => {
        alert('Não foi possível atualizar sua tarefa');
      },
    });
  };
}
