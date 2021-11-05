/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.edu.reto3.reto3;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jennifer
 */
    
@Service
public class ServiciosAdmin {
    @Autowired
    private RepositorioAdmin metodosCrud;

    public List<Admin> getAll() {
        return metodosCrud.getAll();
    }

    public Optional<Admin> getAdmin(int adminId) {
        return metodosCrud.getAdmin(adminId);
    }

    public Admin save(Admin admin) {
        if (admin.getIdAdmin()== null) {
            return metodosCrud.save(admin);
        } else {
            Optional<Admin> admin1 = metodosCrud.getAdmin(admin.getIdAdmin());
            if (admin1.isEmpty()) {
                return metodosCrud.save(admin);
            } else {
                return admin;
            }
        }
    }

    
    public Admin update(Admin admin){
        if(admin.getIdAdmin()!=null){
            Optional<Admin>h=metodosCrud.getAdmin(admin.getIdAdmin());
        if(!h.isEmpty()){
                if(admin.getName()!=null){
                    h.get().setName(admin.getName());
                }
                if(admin.getEmail()!=null){
                    h.get().setEmail(admin.getEmail());
                }
                if(admin.getPassword()!=null){
                    h.get().setPassword(admin.getPassword());
                }
                metodosCrud.save(h.get());
                return h.get();
            }else{
                return admin;
            }
        }else{
            return admin;
    }
    
    }
    public boolean deleteAdmin(int adminId){
        Boolean iBoolean=getAdmin(adminId).map(admin -> {
            metodosCrud.delete(admin);
            return true;
        }).orElse(false);
        return iBoolean;
    }    

}
