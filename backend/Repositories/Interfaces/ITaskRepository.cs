using mosheSI.Models;

namespace mosheSI.Repositories.Interfaces
{
    public interface ITaskRepository
    {
        Task<List<TaskModel>> GetAll();
        Task<TaskModel> Get(int id);
        Task<TaskModel> Create(TaskModel taskModel);
        Task<TaskModel> Update(TaskModel taskModel, int id);
        Task<bool> Delete(int id);   

        Task<List<TaskModel>> GetCompleted();
    }
}
