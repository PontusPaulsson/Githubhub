package com.example.githubhub.rest;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.githubhub.model.Query;
import com.example.githubhub.model.SearchResult;
import com.google.gson.Gson;

@org.springframework.web.bind.annotation.RestController
public class RestController {
	
	@Autowired
	RestClient restClient;
	
	@Autowired
	Gson gson;
	
	/* Gammal
	@CrossOrigin
	@GetMapping(params= {"query", "language", "sort", "pageNumber"})
	public SearchResult search(@RequestParam("query") String query, @RequestParam("language") String language, 
			@RequestParam("sort") String sort, @RequestParam("order") String order, @RequestParam("pageNumber") String pageNumber) throws IOException {
		gson = new Gson();
		return gson.fromJson(restClient.search(query, language, sort, order, pageNumber), SearchResult.class);
		
	}
	*/
	//@CrossOrigin //Enables CORS or Cross Origin Resource Sharing -- This means that applications running on other "Origins" (domains) can request this method.
	@RequestMapping(value = ("/"), method = RequestMethod.POST)
	public SearchResult searchWithJsonObject(@RequestBody Query query) throws IOException {
		return gson.fromJson(restClient.search(query.getQuery(), query.getLanguage(), query.getSort(), query.getSortOrder(), query.getPageNumber()), SearchResult.class);
	}
}
