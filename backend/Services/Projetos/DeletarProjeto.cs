namespace Tis4.Services.Projetos.DeletarProjeto;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Services.Projetos.Interfaces.IDeletarProjeto;

public class DeletarProjeto : IDeletarProjeto
{
    public void deletarProjeto(int ID){
        
        var conn = new DataBaseConnection().dataBaseConnection();
        conn.Open();

        var cmd = new NpgsqlCommand("DELETE FROM public.\"Projeto\" WHERE id = @ID", conn);

        cmd.Parameters.AddWithValue("ID", ID);

        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
    }
}