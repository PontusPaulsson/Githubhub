package com.example.githubhub.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Query {

	public String query;
	public String language;
	public String sort;
	public String sortOrder;
	public String pageNumber;
	
	public Query(String query, String language, String sort, String sortOrder, String pageNumber) {
		super();
		this.query = query;
		this.language = language;
		this.sort = sort;
		this.sortOrder = sortOrder;
		this.pageNumber = pageNumber;
	}
	public String getQuery() {
		return query;
	}
	public void setQuery(String query) {
		this.query = query;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public String getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}
	public String getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}
	@Override
	public String toString() {
		return "Query [query=" + query + ", language=" + language + ", sort=" + sort + ", sortOrder=" + sortOrder
				+ ", pageNumber=" + pageNumber + "]";
	}
	
	
	
}
