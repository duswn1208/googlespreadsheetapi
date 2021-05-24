package com.axr.holiday;

import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.auth.openidconnect.IdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;


@RestController
public class APIController {
	
	private HolidayView view;
	
	//Global instance of the HTTP transport
	private static HttpTransport HTTP_TRANSPORT;
	
	//Global instance of the JSON Factory
	private static final JacksonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	
	//HTTP_TRANSPROT 초기화
		static{
			try {
				HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
				
			}catch(Throwable t) {
				t.printStackTrace();
				System.exit(1);
			}
		}
		
	
	private final String CLIENT_ID = "21190506579-4h4uorva534e7n08tvq64cc6p5pajnpj.apps.googleusercontent.com";
	
	@RequestMapping("/login")
	public String login(HttpServletRequest req) throws Exception{
		String id_token = req.getParameter("id_token");
		
		GoogleIdTokenVerifier verifier = 
				new GoogleIdTokenVerifier.Builder(HTTP_TRANSPORT, JSON_FACTORY)
				.setAudience(Collections.singleton(CLIENT_ID)).build();
		
		GoogleIdToken idToken = verifier.verify(id_token);
		JSONObject jo = new JSONObject();
		if(idToken!=null) {
			
			Payload payload = idToken.getPayload();
			
			String userId = payload.getSubject();
			String email = (String) payload.get("email");
			
			if(email.contains("awexomeray.com")) {
				jo.put("name", (String)payload.get("name"));
				jo.put("loginSuccess", true);
				return jo.toString();
			}else {
				jo.put("name", (String)payload.get("name"));
				jo.put("loginSuccess", false);
				return jo.toString();
				
			}
			
		}else {
			System.out.println("Login Invalid ID Token. ");
			jo.put("name", "NoName");
			jo.put("loginSuccess", true);
			return jo.toString();
		}
		
		
	}
	
	@RequestMapping("/auth")
	public String auth(HttpServletRequest req) throws Exception{
		String id_token = req.getParameter("id_token");
		
		JSONObject jo = new JSONObject();
		if(!id_token.equals("null")) {
			
			GoogleIdTokenVerifier verifier = 
					new GoogleIdTokenVerifier.Builder(HTTP_TRANSPORT, JSON_FACTORY)
					.setAudience(Collections.singleton(CLIENT_ID)).build();
			
			GoogleIdToken idToken = verifier.verify(id_token);
			
			Payload payload = idToken.getPayload();
			
			jo.put("name", payload.getSubject());
			
			String email = (String) payload.get("email");
			if(email.contains("awexomeray.com")) {
				jo.put("name", payload.getSubject());
				jo.put("isAuth", true);
				
				return jo.toString();
				
			}else {
				jo.put("msg", "not");
				jo.put("isAuth", false);
				
				return jo.toString();
			}
			
		}else {
			System.out.println("Auth Invalid ID Token. ");
			jo.put("name", "No Name");
			jo.put("msg", "invalid");
			jo.put("isAuth", false);
			
			return jo.toString();
		}
		
		
	}

	@RequestMapping("/api/vacation")
	public List<Object> vacation(HttpServletRequest req) throws Exception{
		System.out.println("api/vacation");
		String userName = req.getParameter("name");
		Sheets service = view.getSheetsService();
		
		String spreadsheetId = "18AcsYPzQ9zC90pM-q478tYx086X1Jk3Jk9YydxsUOvk";
		String range = "시트!A3:P";
		ValueRange response = service.spreadsheets().values()
				.get(spreadsheetId, range)
				.execute();
		
		List<List<Object>> values = response.getValues();
		if(values==null||values.size()==0){
			System.out.println("No data found!");
			return null;
		}else{
			for(List row: values) {
				
				String name = (String) row.get(1);
				if(name.equals(userName)) {
					return row;
				}
			}
		}
		return null;
	}

}