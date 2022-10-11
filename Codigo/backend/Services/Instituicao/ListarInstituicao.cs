namespace Tis4.Services.Instituicao.listarInstituicao;

using System.Collections.Generic;
using Tis4.Models.Instituicao.InstituicaoModel;
using Tis4.Services.Instituicao.Interfaces.IVisualizarInstiuicoes;
using Tis4.Connections.DataBaseConnection;
using Npgsql;

public class listarInstituicao : IVisualizarInstiuicoes
{
    public List<InstituicaoModel> listarTodasInstituicoes()
    {
        List<InstituicaoModel> instituicoesCadastradas = new List<InstituicaoModel>();
        
        var conn = new DataBaseConnection().TesteDataBaseConnection();

        conn.Open();

        var cmd = new NpgsqlCommand("SELECT * FROM public.\"Instituicao\"", conn);

        var reader = cmd.ExecuteReader();

        while (reader.Read()){
            InstituicaoModel instituicao = new InstituicaoModel();
            instituicao.ID            = (int)reader["id"];
            instituicao.nome          = reader["nome"].ToString();
            instituicao.email         = reader["email"].ToString();
            instituicao.telefone      = reader["telefone"].ToString();
            instituicao.sponsor       = reader["sponsor"].ToString();
            instituicao.intercedente  = reader["intercedente"].ToString();
            instituicao.dataEntrada   = (DateTime)reader["data_entrada"];
            instituicoesCadastradas.Add(instituicao);
        }

        conn.Close();

        return instituicoesCadastradas;

    }
}