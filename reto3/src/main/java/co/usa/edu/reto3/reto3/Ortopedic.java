/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package co.usa.edu.reto3.reto3;

/**
 *
 * @author Jennifer
 */

/**
 *
 * Importaciones
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
/**
 * 
 * Entity
 */
@Entity
/**
 * Table
 */
@Table(name = "ortopedic")
/**
 * Clase Ortopedic
 */
public class Ortopedic implements Serializable{
    /**
     * Id y generatevalue
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     /**
     * Atributos
     */
    private Integer id;
     /**
     * Atributos
     */
    private String name;
     /**
     * Atributos
     */
    private String brand;
     /**
     * Atributos
     */
    private Integer year;
     /**
     * Atributos
     */
    private String description;
    /**
     * Relaciones
     */
    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("ortopedics")
    private Categoria category;
    /**
     * Relaciones
     */
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "ortopedic")
    @JsonIgnoreProperties({"ortopedic", "client"})
    private List<Mensaje> messages;
    /**
     * Relaciones
     */
    @OneToMany(cascade = {CascadeType.PERSIST},mappedBy = "ortopedic")
    @JsonIgnoreProperties({"ortopedic", "client"})
    private List<Reservaciones> reservations;
    /**
     * Getter and setters
     *
     */
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Categoria getCategory() {
        return category;
    }

    public void setCategory(Categoria category) {
        this.category = category;
    }

    public List<Mensaje> getMessages() {
        return messages;
    }

    public void setMessages(List<Mensaje> messages) {
        this.messages = messages;
    }

    public List<Reservaciones> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservaciones> reservations) {
        this.reservations = reservations;
    }
}