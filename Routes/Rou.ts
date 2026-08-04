import { Router } from "../Dependencies/dependencias.ts";
import { getAprendices, getAprendizPorId, postAprendices,  putAprendices,  deleteAprendices 

} from "../Controller/aprendicesController.ts";
import { 
  getAsignaturas, 
  getAsignaturaPorId, 
  postAsignaturas, 
  putAsignaturas, 
  deleteAsignaturas 
} from "../Controller/asignaturaController.ts";
import { 
  getAsistencia, 
  getAsistenciaPorId, 
  postAsistencia, 
  putAsistencia, 
  deleteAsistencia 
} from "../Controller/asistenciaController.ts";
import { 
  getFichas, 
  getFichaPorId, 
  postFichas, 
  putFichas, 
  deleteFichas 
} from "../Controller/fichasController.ts";
import { 
  getInstructores, 
  getInstructorPorId, 
  postInstructores, 
  putInstructores, 
  deleteInstructores 
} from "../Controller/instructoresController.ts";
import { 
  getInstructorAsig, 
  getInstructorAsigPorId, 
  postInstructorAsig, 
  putInstructorAsig, 
  deleteInstructorAsig 
} from "../Controller/instructor_asigController.ts";
import { 
  getProgramas, 
  getProgramaPorId, 
  postProgramas, 
  putProgramas, 
  deleteProgramas 
} from "../Controller/progamasController.ts";

const Rourouter = new Router();

// --- Rutas de Aprendices ---
Rourouter.get("/aprendices", getAprendices);
Rourouter.get("/aprendices/:id", getAprendizPorId);
Rourouter.post("/aprendices", postAprendices);
Rourouter.put("/aprendices/:id", putAprendices);
Rourouter.delete("/aprendices/:id", deleteAprendices);

// --- Rutas de Asignaturas ---
Rourouter.get("/asignaturas", getAsignaturas);
Rourouter.get("/asignaturas/:id", getAsignaturaPorId);
Rourouter.post("/asignaturas", postAsignaturas);
Rourouter.put("/asignaturas/:id", putAsignaturas);
Rourouter.delete("/asignaturas/:id", deleteAsignaturas);

// --- Rutas de Asistencia ---
Rourouter.get("/asistencia", getAsistencia);
Rourouter.get("/asistencia/:id", getAsistenciaPorId);
Rourouter.post("/asistencia", postAsistencia);
Rourouter.put("/asistencia/:id", putAsistencia);
Rourouter.delete("/asistencia/:id", deleteAsistencia);

// --- Rutas de Fichas ---
Rourouter.get("/fichas", getFichas);
Rourouter.get("/fichas/:id", getFichaPorId);
Rourouter.post("/fichas", postFichas);
Rourouter.put("/fichas/:id", putFichas);
Rourouter.delete("/fichas/:id", deleteFichas);

// --- Rutas de Instructores ---
Rourouter.get("/instructores", getInstructores);
Rourouter.get("/instructores/:id", getInstructorPorId);
Rourouter.post("/instructores", postInstructores);
Rourouter.put("/instructores/:id", putInstructores);
Rourouter.delete("/instructores/:id", deleteInstructores);

// --- Rutas de Instructor Asignaciones ---
Rourouter.get("/instructor-asig", getInstructorAsig);
Rourouter.get("/instructor-asig/:id", getInstructorAsigPorId);
Rourouter.post("/instructor-asig", postInstructorAsig);
Rourouter.put("/instructor-asig/:id", putInstructorAsig);
Rourouter.delete("/instructor-asig/:id", deleteInstructorAsig);

// --- Rutas de Programas ---
Rourouter.get("/programas", getProgramas);
Rourouter.get("/programas/:id", getProgramaPorId);
Rourouter.post("/programas", postProgramas);
Rourouter.put("/programas/:id", putProgramas);
Rourouter.delete("/programas/:id", deleteProgramas);

export default Rourouter;