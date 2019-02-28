package com.example.githubhub;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.githubhub.model.Items;
import com.example.githubhub.model.SearchResult;
import com.example.githubhub.rest.RestClient;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@SpringBootApplication
public class GithubhubApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(GithubhubApplication.class, args);
	}

}
