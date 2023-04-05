using Microsoft.AspNetCore.Mvc;
using mosheSI.Models;
using mosheSI.Repositories.Interfaces;
using mosheSI.Services;

namespace mosheSI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {
        private readonly TaskService _taskService;
        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskModel>>> GetAll()
        {
            try
            {
                var tasks = await _taskService.GetAll();
                return Ok(tasks);

            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao buscar tarefas: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> Get(int id)
        {
            try
            {
                var task = await _taskService.Get(id);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao buscar tarefa: {ex.Message}");
            }
        }

        [HttpGet("completed")]
        public async Task<ActionResult<List<TaskModel>>> GetCompleted()
        {
            try
            {
                var tasksCompleted = await _taskService.GetCompleted();
                return Ok(tasksCompleted);
            }
            catch (Exception ex)
            {
                return BadRequest($"Não foi possível buscar as tarefas completadas: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<TaskModel>> Create([FromBody] TaskModel taskModel)
        {
            try
            {
                var task = await _taskService.Create(taskModel);
                return Ok(taskModel);

            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao criar tarefa: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TaskModel>> Update([FromBody] TaskModel taskModel, int id)
        {
            try
            {
                var task = await _taskService.Update(taskModel, id);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao atualizar a tarefa: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                var deleted = await _taskService.Delete(id);
                return Ok(deleted);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao deletar a tarefa {ex.Message}");
            }
        }

    }
}
