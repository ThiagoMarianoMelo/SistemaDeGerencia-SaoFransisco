namespace Tis4.Services.Projetos.AlterarProjeto;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Models.Projeto.AlterarProjetoModel;
using Tis4.Services.Projetos.Interfaces.IAlterarProjeto;
public class AlterarProjeto : IAlterarProjeto{
    
    public void alterarProjeto(AlterarProjetoModel projetoAtualizado){
        var conn = new DataBaseConnection().dataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("UPDATE public.\"Projeto\" SET \"nome\" = @Nome, \"coordenador\" = @Coordenador, \"idusuarioalteracao\" = @IDUsuario, \"dataAlteracao\" = @DataAlteracao WHERE \"id\" = @ID", conn);

        cmd.Parameters.AddWithValue("Nome", projetoAtualizado.nome);
        cmd.Parameters.AddWithValue("Coordenador", projetoAtualizado.coordenador);
        cmd.Parameters.AddWithValue("dataAlteracao",DateTime.Now);
        cmd.Parameters.AddWithValue("IDUsuario", projetoAtualizado.IDUsuario);
        cmd.Parameters.AddWithValue("ID", projetoAtualizado.IDProjeto);
    
        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
        
    }
}