/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.edu.reto3.reto3;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Usuario
 */
@Repository
public class RepositorioAdmin {
    
    @Autowired
    private InterfaceAdmin crud5;
    public List<Admin> getAll(){
        return (List<Admin>) crud5.findAll();
    }
    public Optional<Admin> getAdmin(int id){
        return crud5.findById(id);
    }

    public Admin save(Admin admin){
        return crud5.save(admin);
    }
    public void delete(Admin admin){
       crud5.delete(admin);
    }
}
        