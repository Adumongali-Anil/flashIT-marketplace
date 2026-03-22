package org.jain.stallsspringboot.entity;

import jakarta.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private int stock;

    @Column(name="image_url")
    private String imageUrl;

    private boolean active = true;

    @Column(nullable=false)
    private boolean deleted=false;

    /* ✅ STALL */
    @ManyToOne
    @JoinColumn(name="stall_id")
    private Stalls stall;

    /* ✅ VERY IMPORTANT — VENDOR */
    @ManyToOne
    @JoinColumn(name="vendor_id")
    private User vendor;

    /* ================= GETTERS ================= */

    public Long getId(){ return id; }
    public void setId(Long id){ this.id=id; }

    public String getName(){ return name; }
    public void setName(String name){ this.name=name; }

    public String getDescription(){ return description; }
    public void setDescription(String description){ this.description=description; }

    public double getPrice(){ return price; }
    public void setPrice(double price){ this.price=price; }

    public int getStock(){ return stock; }
    public void setStock(int stock){ this.stock=stock; }

    public String getImageUrl(){ return imageUrl; }
    public void setImageUrl(String imageUrl){ this.imageUrl=imageUrl; }

    public boolean isActive(){ return active; }
    public void setActive(boolean active){ this.active=active; }

    public boolean isDeleted(){ return deleted; }
    public void setDeleted(boolean deleted){ this.deleted=deleted; }

    public Stalls getStall(){ return stall; }
    public void setStall(Stalls stall){ this.stall=stall; }

    /* ✅ Vendor */
    public User getVendor(){ return vendor; }
    public void setVendor(User vendor){ this.vendor=vendor; }
}