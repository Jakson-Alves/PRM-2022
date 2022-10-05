import { ColumnActionsMode, IColumn, Panel, PanelType, SelectionMode, ShimmeredDetailsList, Stack, TextField } from "@fluentui/react";
import { IBrand } from "@typesCustom";
import { useEffect, useState } from "react";
import { MessageBarCustom } from "../../components/MessageBarCustom";
import { PageToolBar } from "../../components/PageToolBar";
import { listBrands } from "../../services/server";


export function BrandPage() {

    //Entities - entidades

    //Atributo do tipo IBrand quando tem um selecionado
    const [brand, setBrand] = useState<IBrand>({} as IBrand);
    const [brands, setBrands] = useState<IBrand[]>([]);

    //State - Mensagens para guardar erro
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');

    //aplicação inicia no modo loading
    const [loading, setLoading] = useState(true);

    //State abre e fecha forma
    const [openPanel, setOpenPanel] = useState(false);

    //Colunas
    const columns: IColumn[] = [
        {
            key: 'name',
            name: 'Nome da Marca',
            fieldName: 'name',
            minWidth: 100,
            isResizable: false,
            columnActionsMode: ColumnActionsMode.disabled
        }

    ]

    useEffect(()=> {
        
        listBrands()
            .then(result => {
                setBrands(result.data)
            })
            .catch(error => {
                // Mostra o erro e depois some
                setMessageError(error.message);
                setInterval(() => {
                    handleDemissMessageBar();
                }, 10000);
            })
            .finally(() => setLoading(false))

    }, [])

    function handleDemissMessageBar(){
        setMessageError('');
        setMessageSuccess('');
    }

    function handleNew(){
        setBrand({
            name: ''
        });

        setOpenPanel(true);
    }

    return (
        <div id="brand-page" className="mains-content">
            <Stack horizontal={false}>
                <PageToolBar
                    currentPageTitle="Marcas"
                    loading={loading}
                    onNew={ handleNew }/>

                <MessageBarCustom
                    messageError={messageError}
                    messageSuccess={messageSuccess}
                    onDismiss={handleDemissMessageBar}/>

                {/* Criar tabela com */}
                <div className="data-list">
                    <ShimmeredDetailsList
                        items={brands}
                        columns={columns}
                        setKey="set"
                        enableShimmer={loading}
                        selectionMode={SelectionMode.none}
                    />
                </div>
            </Stack>

            <Panel
                className="panel-form"
                isOpen={openPanel}
                type={PanelType.medium}
                headerText="Cadastro de Marca"
                isFooterAtBottom={true}
                onDismiss={() => setOpenPanel(false)}>

                <p>Preencha todos os campos obrigatórios identificados por <span className="required">*</span></p>

                <Stack horizontal={false} className="panel-form=content">
                    <TextField
                        label="Nome da Marca"
                        required
                        value={brand.name}
                        onChange={event => setBrand({...brand, name: (event.target as HTMLInputElement).value})}>
                    </TextField>
                </Stack>                
            </Panel>
        </div>
    )
}