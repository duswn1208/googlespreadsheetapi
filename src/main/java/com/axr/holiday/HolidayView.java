package com.axr.holiday;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;

public class HolidayView {

private Sheets service;
	
	//oauth 2.0 연동시 지정한 oauth 2.0 클라이언트 이름
	private static final String APPLICATION_NAME = "HolidayView";
	
	//OAUTH 2.0 연동시 credential 을 디스크에 저장할 위치
	private static final File DATA_STORE_DIR = new File(System.getProperty("user.home"), ".credentials/sheets/googleapis.com-java-holidayView");
	
	//Global instance of the FileDataStoreFactory
	private static FileDataStoreFactory DATA_STORE_FACTORY;
	
	//Global instance of the JSON Factory
	private static final JacksonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	
	//Global instance of the HTTP transport
	private static HttpTransport HTTP_TRANSPORT;
	
	//OAUTH 2.0 연동시 사용될 callback용 local receiver 포트 지정
	private static final int LOCAL_SERVER_RECEIVER_PORT=8080;
	
	//Google Sheet API 권한을 SCOPE로 지정
	private static final List<String> SCOPES = Arrays.asList(SheetsScopes.SPREADSHEETS_READONLY);
	
	//HTTP_TRANSPROT, DATA_STORE_FACTORY 초기화
	static{
		try {
			HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
			DATA_STORE_FACTORY = new FileDataStoreFactory(DATA_STORE_DIR);
			
		}catch(Throwable t) {
			t.printStackTrace();
			System.exit(1);
		}
	}
	
	public static Credential authorize() throws IOException{
		
		InputStream in = HolidayView.class.getResourceAsStream("/client_secret.json");
		
		GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
		
		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
				.setDataStoreFactory(DATA_STORE_FACTORY)
				.setAccessType("offline")
				.build();
		
		LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(LOCAL_SERVER_RECEIVER_PORT).build();
		Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
		
		System.out.println("Credentials Saved To "+ DATA_STORE_DIR.getAbsolutePath());
		
		return credential;
		
	}
	
	
	public static Sheets getSheetsService() throws IOException{
		
		Credential credential = authorize();
		
		return new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
				.setApplicationName(APPLICATION_NAME)
				.build();
		
	}
	
	public static void main(String[] args) throws IOException{
		
		Sheets service = getSheetsService();
		
		String spreadsheetId = "18AcsYPzQ9zC90pM-q478tYx086X1Jk3Jk9YydxsUOvk";
		String range = "시트!A3:P";
		ValueRange response = service.spreadsheets().values()
				.get(spreadsheetId, range)
				.execute();
		
		List<List<Object>> values = response.getValues();
		if(values==null||values.size()==0){
			System.out.println("No data found!");
		}else{
			for(List row: values) {
				System.out.println(row.get(1)+"님의 휴가 잔여일수 : "+row.get(12));
			}
		}
		
		
		
	}
}
