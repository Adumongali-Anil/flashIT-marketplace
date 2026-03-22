package org.jain.stallsspringboot.dto;

public class VendorRevenueDTO {

    private long totalOrders;
    private long totalProductsSold;
    private double totalRevenue;

    public VendorRevenueDTO(long totalOrders,
                            long totalProductsSold,
                            double totalRevenue) {
        this.totalOrders = totalOrders;
        this.totalProductsSold = totalProductsSold;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public long getTotalProductsSold() {
        return totalProductsSold;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }
}