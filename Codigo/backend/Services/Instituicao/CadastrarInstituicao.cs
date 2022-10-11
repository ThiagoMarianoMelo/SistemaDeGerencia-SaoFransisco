namespace Tis4.Services.Instituicao.CadastrarInstituicao;

using Npgsql;
using Tis4.Connections.DataBaseConnection;
using Tis4.Models.Instituicao.CadastrarInstituicaoModel;
using Tis4.Services.Instituicao.Interfaces.ICadastrarInstituicao;

public class CadastrarInstituicao : ICadastrarInstituicao
{
    public void cadastrarInstituicao(CadastrarInstituicaoModel instituicao)
    {
        var conn = new DataBaseConnection().TesteDataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("INSERT INTO public.\"Instituicao\"(\"nome\",\"email\",\"telefone\",\"sponsor\",\"intercedente\",\"data_entrada\") VALUES (@Nome,@Email,@Telefone,@Sponsor,@Intercedente,@Data)", conn);

        cmd.Parameters.AddWithValue("Nome", instituicao.nome);
        cmd.Parameters.AddWithValue("Email", instituicao.email);
        cmd.Parameters.AddWithValue("Telefone", instituicao.telefone);
        cmd.Parameters.AddWithValue("Sponsor", instituicao.sponsor);
        cmd.Parameters.AddWithValue("Intercedente", instituicao.intercedente);
        cmd.Parameters.AddWithValue("Data", DateTime.Now);


        var reader = cmd.ExecuteReader();

        reader.Read();

        conn.Close();
    }
}