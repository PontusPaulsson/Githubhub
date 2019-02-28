package com.example.githubhub.model;

public class SearchResult
{
    private String total_count;

    private String incomplete_results;

    private Items[] items;

    public String getTotal_count ()
    {
        return total_count;
    }

    public void setTotal_count (String total_count)
    {
        this.total_count = total_count;
    }

    public String getIncomplete_results ()
    {
        return incomplete_results;
    }

    public void setIncomplete_results (String incomplete_results)
    {
        this.incomplete_results = incomplete_results;
    }

    public Items[] getItems ()
    {
        return items;
    }

    public void setItems (Items[] items)
    {
        this.items = items;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [total_count = "+total_count+", incomplete_results = "+incomplete_results+", items = "+items+"]";
    }
}
