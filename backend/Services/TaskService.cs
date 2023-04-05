using mosheSI.Models;
using mosheSI.Repositories.Interfaces;
using System.Threading.Tasks;

namespace mosheSI.Services
{
    public class TaskService : ITaskRepository
    {
        private readonly ITaskRepository _taskRepository;
        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public Task<TaskModel> Create(TaskModel taskModel)
        {
            return _taskRepository.Create(taskModel);
        }

        public Task<bool> Delete(int id)
        {
            return _taskRepository.Delete(id);  
        }

        public async Task<TaskModel> Get(int id)
        {
            var task = await _taskRepository.Get(id);

            if(task == null)
            {
                throw new Exception($"Tarefa com o id {id} não encontrada");
            }

            return task;
        }

        public async Task<List<TaskModel>> GetAll()
        {
            var tasks = await _taskRepository.GetAll();
            return tasks;
        }

        public async Task<List<TaskModel>> GetCompleted()
        {
            var tasksCompleted = await _taskRepository.GetCompleted();
            return tasksCompleted;
        }

        public async Task<TaskModel> Update(TaskModel taskModel, int id)
        {
            var task = await _taskRepository.Update(taskModel, id);

            if (task == null)
            {
                throw new Exception($"Tarefa com o id {id} não encontrada");
            }

            return task;
        }
    }
}
