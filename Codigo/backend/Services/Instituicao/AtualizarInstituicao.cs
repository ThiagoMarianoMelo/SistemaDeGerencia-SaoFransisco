namespace Tis4.Services.Instituicao.AtualizarInstituicao;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Models.Instituicao.InstituicaoModel;
using Tis4.Services.Instituicao.Interfaces.IAtualizarInstituicao;


public class AtualizarInstituicao : IAtualizarInstituicao
{
    void IAtualizarInstituicao.AtualizarInstituicao(InstituicaoModel instituicao)
    {
        

        var conn = new DataBaseConnection().TesteDataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("UPDATE public.\"Instituicao\" SET \"nome\" = @Nome, \"email\" = @Email, \"telefone\" = @Telefone, \"sponsor\" = @Sponsor, \"intercedente\" = @Intercedente WHERE \"ID = @ID", conn);

        cmd.Parameters.AddWithValue("Nome", "Thiago");
        cmd.Parameters.AddWithValue("Email", instituicao.email);
        cmd.Parameters.AddWithValue("Telefone", instituicao.telefone);
        cmd.Parameters.AddWithValue("Sponsor", instituicao.sponsor);
        cmd.Parameters.AddWithValue("Intercedente", instituicao.intercedente);

        cmd.Parameters.AddWithValue("ID", instituicao.ID);

        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
    }
}