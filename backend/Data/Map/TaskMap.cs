using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using mosheSI.Models;

namespace mosheSI.Data.Map
{
    public class TaskMap : IEntityTypeConfiguration<TaskModel>
    {
        public void Configure(EntityTypeBuilder<TaskModel> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(255);
            builder.Property(x => x.Description).IsRequired().HasMaxLength(1250);
            builder.Property(x => x.Completed).HasDefaultValue(false);
            builder.Property(x => x.Created_At).HasDefaultValue(DateTime.UtcNow);
            builder.Property(x => x.Updated_At).HasDefaultValue(DateTime.UtcNow);
        }
    }
}
