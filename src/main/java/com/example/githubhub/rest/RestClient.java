package com.example.githubhub.rest;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Component;

@Component
public class RestClient {

	URL url;
	
	//Searches github and returns string with json.
	public String search(String query, String language, String sort, String order, String pageNumber ) throws IOException {
		
		if(language.equals("")) {
			url = new URL("https://api.github.com/search/repositories?q=" + (URLEncoder.encode(query, "UTF-8") + "+&sort=" + sort + "&order=" + order + "&page=" + pageNumber));
		}else {
			url = new URL("https://api.github.com/search/repositories?q=" + (URLEncoder.encode(query, "UTF-8") + "+language:" + (URLEncoder.encode(language, "UTF-8") + "&sort=" + sort + "&order=" + order + "&page=" + pageNumber)));
		}
		
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod("GET");
		conn.setRequestProperty("Accept", "application/json");
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		
		if(conn.getResponseCode() == 200) {
			return br.readLine();
		}else {
			throw new RuntimeException("Something went wrong with getting searchresult from Github. Responsecode: " + conn.getResponseCode());
		}		
	}
}

