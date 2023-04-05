using Microsoft.EntityFrameworkCore;
using mosheSI.Data;
using mosheSI.Models;
using mosheSI.Repositories.Interfaces;
using System.Threading.Tasks;

namespace mosheSI.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskContext _dbContext;
        public TaskRepository(TaskContext taskContext)
        {
            _dbContext = taskContext;
        }

        public async Task<TaskModel> Get(int id)
        {
            return await _dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<TaskModel>> GetAll()
        {
            return await _dbContext.Tasks.Where(x => x.Completed == false).ToListAsync();
        }

        public async Task<TaskModel> Create(TaskModel task)
        {
            _dbContext.Tasks.Add(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }

        public async Task<TaskModel> Update(TaskModel taskModel, int id)
        {
            var taskExists = await Get(id);

            taskExists.Name = taskModel.Name;
            taskExists.Description = taskModel.Description;
            taskExists.Updated_At = DateTime.Now;
            taskExists.Completed = taskModel.Completed;

            _dbContext.Tasks.Update(taskExists);
            await _dbContext.SaveChangesAsync();
            return taskExists;
        }

        public async Task<bool> Delete(int id)
        {
            var taskExists = await Get(id);

            _dbContext.Tasks.Remove(taskExists);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<List<TaskModel>> GetCompleted()
        {
            var tasksCompleted = await _dbContext.Tasks.Where(x => x.Completed == true).ToListAsync();
            return tasksCompleted;
        }
    }
}
