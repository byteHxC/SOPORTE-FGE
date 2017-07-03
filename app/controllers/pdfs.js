
const db    = require('../../config/database')
var fonts = {
        Roboto: {
            normal: __dirname +'/../assets/fonts/pdfmake/Roboto-Regular.ttf',
            bold: __dirname+'/../assets/fonts/pdfmake/Roboto-Medium.ttf',
            italics: __dirname+'/../assets/fonts/pdfmake/Roboto-Italic.ttf',
            bolditalics: __dirname+'/../assets/fonts/pdfmake/Roboto-Italic.ttf'
        }
    };
var pdfmake = require('pdfmake');
var PdfPrinter = require(__dirname + '/../../node_modules/pdfmake/src/printer');
var printer = new PdfPrinter(fonts);

module.exports = {
    dictamenPDF: (data, res) => {
        var dd = {
            content: [
                { 
                    text: 'Físcalia General del Estado de Guerrero', 
                    style: 'header', 
                    alignment: 'center',
                    margin: [10,0,0,0] 
                },
                {
                    text: '\n\n\nChilpancingo, Gro., Julio 2, 2017\n\n\n\n',
                    style: 'subheader',
                    alignment: 'right'
                },
                
                {
                    text: 'Lic. Alejandro Santos González.\nVicefiscal de Prevención y Seguimiento.\n\n',
                    style: 'subheader'
                },
                {
                    text: [
                        'Me dirijo a usted con la finalidad de solicitar la baja definitiva del inventario el equipo que se menciona a continuación con sus respectivas características:\n\n\n'
                    ],
                    style: 'subheader',
                    bold: false
                },

                {
                    style: 'body',
                    fontSize: 12.5,
                    columns: [
                        {
                            width: 295,
                            text: ['Marca:  ',{
                                text: 'HP\n', bold: true,
                            },
                            'Disco Duro:  ',{
                                text: '500 GB\n', bold: true,
                            },
                            'Sistema Operativo:  ',{
                                text: 'Windows 7\n', bold: true,
                            },
                            'Cve Inventarial: ',{
                                text: '1-71-4-1-61-13-01-C05-Y84-5829', bold: true,
                            },
                            
                        ]},
                        {
                            width: 300,
                            text: ['Memoria RAM:  ',{
                                text: '4 GB\n', bold: true,
                            },
                            'Procesador:  ',{
                                text: 'AMD\n', bold: true,
                            },
                            'Modelo:  ',{
                                text: 'HP-W17e\n', bold: true,
                            },
                            'No. Serie: ',{
                                text: 'AV-0DJ365-81182-95G-194\n\n', bold: true,
                            },
                            
                        ]}
                    ]			
                },
                {
                    text: [
                        '\nEl equipo pertenecía a ',
                        //Dueño del equipo
                        { text: 'LIC. ANA LETICIA CHÁVEZ GÓMEZ', bold: true },
                        ' del área de ',
                        //Adscripcion
                        { text: 'RECURSOS HUMANOS.', bold: true},
                        '\nEl servicio que se solicito fue ',
                        //Servicio solicitado
                        {text: 'SOPORTE TECNICO', bold: true, },
                        ', el equipo presentaba las siguientes fallas: ',
                        //Descripcion de la falla
                        {text: 'Se apaga constantemente', bold: true, italics: true},
                        '.\n\nSe realizo la revisión del equipo y el diagnostico fue: ',
                        //Diagnostico del equipo
                        {text: 'No sirve la tarjeta madre', bold: true, italics: true},
                        '\n\nPor tal motivo, el equipo debe ser dado de baja ya que no tiene solución la falla presentada y este queda inservible.',
                        '\n\nSin otro particular por el momento me despido de usted enviándole un cordial saludo.\n\n\n\n\n\n\n\n\n',
                    ],
                    style: 'body'
                },
                {	
                    table : 
                    {				
                        
                        headerRows : 1,
                        widths: [200],
                        body : [
                        [''],
                        ['Eva Hernandez Aparicio']
                        ],
                    },
                    margin: [155,0,0,0],
                    layout : 'headerLineOnly',
                    alignment: 'center',
                    bold: false,
                }
            ],
                styles: {
                    header: {
                        fontSize: 16,
                        bold: true,
                        alignment: 'justify'
                    },
                    subheader: {
                        fontSize: 13.5,
                        bold: true,
                        alignment: 'justify'
                    },
                    body: {
                        fontSize: 13,
                        bold: false,
                        alignment: 'justify'
                    }
                }
            }
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(res);
	    pdfDoc.end();  

    },
    reportePDF: (data, res) => {
        firma_salida = {
                        colSpan: 9,
                        alignment: 'center',
                        text: ''
                    }
        
        if(data.firma_salida){
            
            firma_salida = {
                colSpan: 9,
                alignment: 'center',
                image: __dirname + `/../signatures/${data.firma_salida}`,
                width: 300,
                height: 70
            }
        }
        firma_conformidad = {
                        colSpan: 9,
                        alignment: 'center',
                        text: ''
                    }
        if(data.firma_conformidad){
            firma_conformidad = {	
                                colSpan: 9,
                                alignment: 'center',
                                image: __dirname + `/../signatures/${data.firma_conformidad}`,
                                width: 300,
                                height: 70
                            }
        }
        var dd={
            content:[
                {
                    columns: [
                        {
                            width: '20%',
                            image: __dirname + '/../assets/images/logo.png',
                            width: 60,
                            height: 60
                        },
                        {
                            width: '80%',
                            text: 'DIRECCIÓN GENERAL DE TECNOLOGÍAS DE LA INFORMACIÓN.\nÁREA DE SOPORTE TÉCNICO\nFORMATO: DGTIDTV-1.0\n\n', style: 'header', alignment: 'center',
                            
                        }
                       
                    ]
                },
            {
                style: 'table',
                table: {
                    widths: [50, 50, 50, 50, 50,50,50,50,50,50],
                    body: [
                        [
                        {
                            text: 'Folio:', 
                            bold: true,
                            fillColor: '#eeeeee',
                            alignment: 'right'
                        }, 
                        {
                            text: data.folio_formato || '',
                        }, 	
                        {
                            colSpan: 2,
                            text: 'Fecha de Solicitud:', 
                            alignment: 'right',
                            bold: true,
                            fillColor: '#eeeeee',
                        }, {},
                        {
                            colSpan:2,
                            text: data.fecha_solicitud || '', 
                        }, {}, 
                        {
                            colSpan: 2,
                            text: 'Oficio Relacionado:', 
                            alignment: 'right',
                            fillColor: '#eeeeee',
                            bold: true
                        },{},
                        {
                            text:  data.no_oficio || '', 
                        }
                        ],
                        [
                        {
                            colSpan: 5,
                            text: 'Tipo de Solicitud:', 
                            bold: true,
                            fillColor: '#eeeeee',
                            alignment: 'right'
                        }, 
                        {},{},{},{},
                        {
                            colSpan: 4,
                            text: data.tipo_solicitud  || '', 
                            alignment: 'center'
                        },

                        {},{},{},
                        ],
                        [
                        {
                            colSpan: 9,
                            text: 'DATOS DEL SOLICITANTE',
                            alignment: 'center',
                            fillColor: '#cccccc',
                            bold: true
                        },{},{},{},{},{},{},{},{}
                        ],
                        [
                        {
                            colSpan: 4,
                            text: [
                                    {
                                        text: 'Nombre: ', bold: true,
                                    },
                                    data.nombre || ''
                                ]
                            },
                            {},{},{},
                            {
                                colSpan: 5,
                                text: [
                                    {
                                        text: 'Teléfono: ', bold: true,
                                    },
                                    data.telefono || ''
                                ]
                            },{},{},{},{},
                        ],
                        [
                            {
                                colSpan: 4,
                                text: [
                                    {
                                        text: 'Adscripción: ', bold: true,
                                    },
                                    data.adscripcion || ''
                                ]
                            },
                            {},{},{},
                            {
                                colSpan: 5,
                                text: [
                                    {
                                        text: 'E-mail: ', bold: true,
                                    },
                                    data.email
                                ]
                            },{},{},{},{},
                        ],
                        [
                            {
                                colSpan: 5,
                                text: 'Servicio que Solicita: ', 
                                bold: true,
                                fillColor: '#eeeeee',
                                alignment: 'right'
                            }, 
                            {},{},{},{},
                            {
                                colSpan: 4,
                                text: data.servicio_solicita, 
                                alignment: 'center'
                            },
                            {},{},{},
                        ],
                        [
                            {
                                colSpan: 9,
                                text: 'DESCRIPCIÓN BREVE DE LA FALLA', 
                                bold: true,
                                alignment: 'center',
                                border: [true,true,true,false]
                            }, 
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                            {	colSpan:9,
                                text: [data.descripcion_problema],
                                style: 'normal', 
                                border: [true,false,true,true]
                            },
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                            {
                                colSpan: 9,
                                text: 'DATOS DEL EQUIPO', 
                                bold: true,
                                alignment: 'center',
                                fillColor: '#cccccc'
                            }, 
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                        {
                            colSpan: 4,
                            text: [
                                    {
                                        text: 'Nombre del equipo:    ', bold: true,
                                    },
                                    data.nombre_equipo || ''
                                ]
                            },
                            {},{},{},
                            {
                                colSpan: 5,
                                text: [
                                    {
                                        text: 'Grupo de trabajo:    ', bold: true,
                                    },
                                    data.grupo_de_trabajo || ''
                                ]
                            },{},{},{},{},
                        ],
                        [
                        {
                            colSpan: 4,
                            text: [
                                    {
                                        text: 'Marca:                           ', bold: true,
                                    },
                                    //Marca
                                    data.marca || ''
                                ]
                            },
                            {},{},{},
                            {
                                colSpan: 5,
                                text: [
                                    {
                                        text: 'No.Serie:                   ', bold: true,
                                    },
                                    //Numero serie
                                    data.numero_serie || ''
                                ]
                            },{},{},{},{},
                        ],
                        [
                        {
                            colSpan: 4,
                            text: [
                                    {
                                        text: 'Modelo:                         ', bold: true,
                                    },
                                    //Modelo
                                    data.modelo || ''
                                ]
                            },
                            {},{},{},
                            {
                                colSpan: 5,
                                text: [
                                    {
                                        text: 'Clave Inventarial:    ', bold: true,
                                    },
                                    data.clave_inventarial || ''
                                ]
                            },{},{},{},{},
                        ],
                        [
                            {
                                colSpan: 9,
                                text: 'ESPECIFICACIONES TÉCNICAS', 
                                bold: true,
                                alignment: 'center',
                                fillColor: '#cccccc'
                            }, 
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                        {
                            colSpan: 2,
                            text: 'Disco Duro:', 
                            bold: true,
                            alignment: 'right'			
                        },{},
                        {
                            colSpan: 2,
                            text: data.disco_duro
                        },{},
                        {
                            colSpan: 2,
                            text: 'Sistema Operativo:', 
                            bold: true,
                            alignment: 'right'			
                        },{},
                        {
                            colSpan: 3,
                            text: data.sistema_operativo || ''
                        },
                        {},{}
                        ],
                        [
                        {
                            colSpan: 2,
                            text: 'Memoria RAM:', 
                            bold: true,
                            alignment: 'right'			
                        },{},
                        {
                            colSpan: 2,
                            text: data.memoria_ram || ''
                        },{},
                        {
                            colSpan: 2,
                            text: 'Procesador:', 
                            bold: true,
                            alignment: 'right'			
                        },{},
                        {
                            colSpan: 3,
                            text: data.procesador || ''
                        },
                        {},{}
                        ],
                        [
                        {
                            colSpan: 2,
                            text: 'Observaciones:', 
                            bold: true,
                            alignment: 'right'			
                        },{},
                        {
                            colSpan: 7,
                            text: data.observaciones || ''
                        },{},{},{},{},{},{}
                        ],
                        [
                        {
                            colSpan: 5,
                            text: 'Tipo de Reparación:', 
                            bold: true,
                            fillColor: '#eeeeee',
                            alignment: 'right'
                        }, 
                        {},{},{},{},
                        {
                            colSpan: 4,
                            text: data.tipo_reparacion, 
                            alignment: 'center'
                        },
                        {},{},{},
                        ],
                        [
                            {
                                colSpan: 9,
                                text: 'Autorización de Salida del Equipo', 
                                bold: true,
                                alignment: 'center',
                                border: [true,true,true,false]
                            }, 
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                            firma_salida,
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                            {	
                                colSpan:9,
                                text: [data.nombre || ''],
                                style: 'normal', 
                                bold: true,
                                border: [true,false,true,true],
                                alignment: 'center'
                            },
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                            {
                                colSpan: 9,
                                text: 'DATOS DEL SOPORTE', 
                                bold: true,
                                alignment: 'center',
                                fillColor: '#cccccc'
                            }, 
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                        {
                            colSpan: 9,
                            text: [
                                    {
                                        text: 'Nombre de quien brinda el soporte:    ', bold: true,
                                    },
                                    data.usuario_soporte
                                ]
                            },
                        {},{},{},{},
                        {},{},{},{},
                        ],
                        [
                        {
                            colSpan: 9,
                            text: [
                                    {
                                        text: 'Diagnóstico del Equipo:\n', bold: true,
                                    },
                                    {
                                        text: [data.diagnostico_equipo || ''],
                                style: 'normal',
                                    }
                                ]
                            },
                        {},{},{},{},
                        {},{},{},{},
                        ],
                        [
                        {
                            colSpan: 9,
                            text: [
                                    {
                                        text: 'Carpeta de Respaldo:    ', bold: true,
                                    },
                                    data.carpeta_respaldo || ''
                                ]
                            },
                        {},{},{},{},
                        {},{},{},{},
                        ],
                        [
                            {
                                colSpan: 9,
                                text: 'DATOS DE ENTREGA DEL EQUIPO', 
                                bold: true,
                                alignment: 'center',
                                fillColor: '#cccccc'
                            }, 
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                        {
                            colSpan: 4,
                            text: [
                                    {
                                        text: 'El equipo fue reparado: ', bold: true,
                                    },
                                    //El equipo fue reparado
                                    (data.reparado == 'reparado') ? 'si' : 'no'
                                ]
                            },
                        {},{},{},
                        {
                            colSpan: 5,
                            text: [
                                    {
                                        text: 'El equipo se instaló en su lugar correspondiente: ', bold: true,
                                    },
                                    //El equipo fue reparado
                                    data.instalado_en_ubicacion || ''
                                ]
                        },
                        {},{},{},{},
                        ],
                        [
                        {
                            colSpan: 4,
                            text: [
                                    {
                                        text: 'Fecha de entrega: ', bold: true,
                                    },
                                    //Fecha de entrega
                                    data.fecha_entrega || ''
                                ]
                            },
                        {},{},{},
                        {
                            colSpan: 5,
                            text: [
                                    {
                                        text: 'Calificación del Servicio: ', bold: true,
                                    },
                                    //Calificacion del servicio
                                    data.calificacion_servicio || ''
                                ]
                        },
                        {},{},{},{},
                        ],
                        [
                            {
                                colSpan: 9,
                                text: 'Firma de Conformidad', 
                                bold: true,
                                alignment: 'center',
                                fillColor: '#cccccc',
                                border: [true,true,true,false]
                            }, 
                            {},{},{},{},
                            {},{},{},{},
                        ],
                        [
                            firma_conformidad,
                            {},{},{},{},
                            {},{},{},{},
                        ],					
                    ]	
                }
            }
            ],
            styles: {
                header: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 0, 0, 0]
                },
                table: {
                    margin: [0, 0, 0, 0],
                    fontSize: 11,
                    border: [true,true,true,true]
                },
                normal: {
                    fontSize: 11,
                    color: 'black',
                    alignment: 'justify'
                }
            },
        }

        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(res);
	    pdfDoc.end();

    }
}