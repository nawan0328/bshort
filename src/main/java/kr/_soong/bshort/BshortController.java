package kr._soong.bshort;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller  
public class BshortController implements ErrorController {

	@GetMapping("/bshort")
	public String hello(Model model) {
	    return "bshort";
	}
	
  @GetMapping("/error")
  public String handleError() {
      System.out.println("▶▶▶ /error 요청 도착 (ErrorController)");
      return "errorpage"; // templates/errorpage.html
  }
}