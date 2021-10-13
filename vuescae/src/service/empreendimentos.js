import {http} from './config'

export default{
    listar: () => {
		return http.get('empreendimentos')
	},
    apagar: (empreendimento) => {
		return http.delete('empreendimento', { data: empreendimento })
	}
}