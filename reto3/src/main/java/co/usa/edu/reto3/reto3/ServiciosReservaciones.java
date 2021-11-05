/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.edu.reto3.reto3;
/**
 * Importaciones
 */
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jennifer
 */
@Service
/**
 * Servicio de reservaciones
 */
public class ServiciosReservaciones {
    @Autowired
    /**
     * Metodo CRUD
     */
    private RepositorioReservaciones metodosCrud;
    /**
     * Lista
     */
    public List<Reservaciones> getAll(){
        return metodosCrud.getAll();
    }
    /**
     * get
     */
    public Optional<Reservaciones> getReservation(int reservationId) {
        return metodosCrud.getReservation(reservationId);
    }
    /**
     * save
     */
    public Reservaciones save(Reservaciones reservation){
        if(reservation.getIdReservation()==null){
            return metodosCrud.save(reservation);
        }else{
            Optional<Reservaciones> e= metodosCrud.getReservation(reservation.getIdReservation());
            if(e.isEmpty()){
                return metodosCrud.save(reservation);
            }else{
                return reservation;
            }
        }
    }
    /**
     * update
     */
    public Reservaciones update(Reservaciones reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservaciones> e= metodosCrud.getReservation(reservation.getIdReservation());
            if(!e.isEmpty()){

                if(reservation.getStartDate()!=null){
                    e.get().setStartDate(reservation.getStartDate());
                }
                if(reservation.getDevolutionDate()!=null){
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if(reservation.getStatus()!=null){
                    e.get().setStatus(reservation.getStatus());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return reservation;
            }
        }else{
            return reservation;
        }
    }
    /**
     * delete
     */
    public boolean deleteReservation(int reservationId) {
        Boolean aBoolean = getReservation(reservationId).map(reservation -> {
            metodosCrud.delete(reservation);
            return true;
        }).orElse(false);
        return aBoolean;
    }
     /**
      * Reporte status servicio
      */
    public StatusReservas reporteStatusServicio (){         
    List<Reservaciones>completed= metodosCrud.ReservacionStatusRepositorio("completed");         
    List<Reservaciones>cancelled= metodosCrud.ReservacionStatusRepositorio("cancelled");                  
    return new StatusReservas(completed.size(), cancelled.size() );
    }
    /**
     * Reporte tiempo de servicio
     */
    public List<Reservaciones> reporteTiempoServicio (String datoA, String datoB){         
    SimpleDateFormat parser = new SimpleDateFormat ("yyyy-MM-dd");                  
    Date datoUno = new Date();         
    Date datoDos = new Date();                  
    try{              
    datoUno = parser.parse(datoA);              
    datoDos = parser.parse(datoB);         
    }catch(ParseException evt){             
    evt.printStackTrace();         
        }if(datoUno.before(datoDos)){             
    return metodosCrud.ReservacionTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        
        } 
    }
    /**
     * Reporte clientes-servicio
     */
    public List<ContadorClientes> reporteClientesServicio(){
            return metodosCrud.getClientesRepositorio();
        }
}
