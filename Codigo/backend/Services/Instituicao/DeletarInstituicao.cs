namespace Tis4.Services.Instituicao.DeletarInstituicao;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Services.Instituicao.Interfaces.IDeletarInstituicao;

public class DeletarInstituicao : IDeletarInstituicao
{
    public void deletarInstituicao(int ID)
    {   
        var conn = new DataBaseConnection().TesteDataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("DELETE FROM public.\"Instituicao\" WHERE ID = @ID", conn);

        cmd.Parameters.AddWithValue("ID", ID);

        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
    }
}