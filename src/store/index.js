import Vue from 'vue';
import Vuex from 'vuex';

import actores from './actores';
import actosImpugnados from './actos-impugnados';
import actuaciones from './actuaciones';
import actuarias from './actuarias';
import actuarios from './actuarios';
import acuerdos from './acuerdos';
import anexos from './anexos';
import archivos from './archivos';
import areas from './areas';
import areaTrabajoCedulas from './area-trabajo-cedulas';
import areasConfiguracionesSco from './areas-configuraciones-sco';
import autoridades from './autoridades';
import autorizados from './autorizados';
import cjfDocumentos from './cjf-documentos';
import cjfMensajes from './cjf-mensajes';
import cjfTiposAsuntos from './cjf-tipos-asuntos';
import delegaciones from './delegaciones';
import dependencias from './dependencias';
import dependenciasAutoridades from './dependencias-autoridades';
import diasInhabiles from './dias-inhabiles';
import documentos from './documentos';
import epocas from './epocas';
import estadosListados from './estados-listados';
import estadosProcesalesRa from './estados-procesales-ra';
import exhortos from './exhortos';
import expedientes from './expedientes';
import expedientesElectronicos from './expedientes-electronicos';
import historialAudiencias from './historial-audiencias';
import historialUbicacionesFisicas from './historial-ubicaciones-fisicas';
import gruposPlantillas from './grupos-plantillas';
import layoutsLabels from './layouts-labels';
import listadosTransferencias from './listados-transferencias';
import listadosTransferenciasAcuerdos from './listados-transferencias-acuerdos';
import listadosAcuerdos from './listados-acuerdos';
import listadosAcuerdosComparecencia from './listados-acuerdos-comparecencia';
import magistrados from './magistrados';
import materias from './materias';
import notificaciones from './notificaciones';
import organosCjf from './organos-cjf';
import plantillas from './plantillas';
import oficialiaCitas from './oficialia-citas';
import pagination from './pagination';
import ponencias from './ponencias';
import procedencias from './procedencias';
import procesos from './procesos';
import promoventes from './promoventes';
import resolucionesAmparos from './resoluciones-amparos';
import resolucionesApelacion from './resoluciones-apelacion';
import resolucionesQuejas from './resoluciones-quejas';
import resolucionesReclamacion from './resoluciones-reclamacion';
import roles from './roles';
import representantes from './representantes';
import salas from './salas';
import secretarios from './secretarios';
import sentidosRa from './sentidos-ra';
import sentidosRca from './sentidos-rca';
import sentidosSalaOrdinaria from './sentidos-sala-ordinaria';
import session from './session';
import terceros from './terceros';
import tiposAcuerdo from './tipos-acuerdo';
import tiposAmparos from './tipos-amparos';
import tiposAnexos from './tipos-anexos';
import tiposContribuciones from './tipos-contribuciones';
import tiposDemandas from './tipos-demandas';
import tiposDocumentos from './tipos-documentos';
import tiposDocumentosCorrespondencia from './tipos-documentos-correspondencia';
import tiposJuicios from './tipos-juicios';
import tiposLeyendas from './tipos-leyendas';
import tiposListados from './tipos-listados';
import tiposNotificaciones from './tipos-notificaciones';
import tiposNotifiquese from './tipos-notifiquese';
import tiposOrganosCjf from './tipos-organos-cjf';
import tiposPersonas from './tipos-personas';
import tiposReportes from './tipos-reportes';
import tiposSalas from './tipos-salas';
import tiposSecretarios from './tipos-secretarios';
import tiposTramitesSco from './tipos-tramites-sco';
import tiposTerceros from './tipos-terceros';
import tribunalesColegiados from './tribunales-colegiados';
import ubicacionesFisicas from './ubicaciones-fisicas';
import usuarios from './usuarios';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      actores,
      actosImpugnados,
      actuaciones,
      actuarias,
      actuarios,
      acuerdos,
      anexos,
      archivos,
      areas,
      areaTrabajoCedulas,
      areasConfiguracionesSco,
      autoridades,
      autorizados,
      cjfDocumentos,
      cjfMensajes,
      cjfTiposAsuntos,
      delegaciones,
      dependencias,
      dependenciasAutoridades,
      diasInhabiles,
      documentos,
      epocas,
      estadosListados,
      estadosProcesalesRa,
      exhortos,
      expedientes,
      expedientesElectronicos,
      historialAudiencias,
      historialUbicacionesFisicas,
      gruposPlantillas,
      layoutsLabels,
      listadosTransferencias,
      listadosTransferenciasAcuerdos,
      listadosAcuerdos,
      listadosAcuerdosComparecencia,
      magistrados,
      materias,
      notificaciones,
      organosCjf,
      oficialiaCitas,
      plantillas,
      pagination,
      ponencias,
      procedencias,
      procesos,
      promoventes,
      resolucionesAmparos,
      resolucionesApelacion,
      resolucionesQuejas,
      resolucionesReclamacion,
      representantes,
      roles,
      salas,
      secretarios,
      sentidosRa,
      sentidosRca,
      sentidosSalaOrdinaria,
      session,
      terceros,
      tiposAcuerdo,
      tiposAmparos,
      tiposAnexos,
      tiposContribuciones,
      tiposDemandas,
      tiposDocumentos,
      tiposDocumentosCorrespondencia,
      tiposJuicios,
      tiposLeyendas,
      tiposListados,
      tiposNotificaciones,
      tiposNotifiquese,
      tiposOrganosCjf,
      tiposPersonas,
      tiposReportes,
      tiposSalas,
      tiposSecretarios,
      tiposTerceros,
      tiposTramitesSco,
      tribunalesColegiados,
      ubicacionesFisicas,
      usuarios,
    },
  });

  return Store;
}
