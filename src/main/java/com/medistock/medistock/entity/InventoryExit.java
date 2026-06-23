package com.medistock.medistock.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_exits")
public class InventoryExit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    @NotNull(message = "La cantidad es obligatoria")
    private Integer quantity;

    private LocalDateTime exitDate = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    private String reason;

    public InventoryExit() {}

    public InventoryExit(Medicine medicine, Integer quantity, User user, String reason) {
        this.medicine = medicine;
        this.quantity = quantity;
        this.user = user;
        this.reason = reason;
        this.exitDate = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public LocalDateTime getExitDate() { return exitDate; }
    public void setExitDate(LocalDateTime exitDate) { this.exitDate = exitDate; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
