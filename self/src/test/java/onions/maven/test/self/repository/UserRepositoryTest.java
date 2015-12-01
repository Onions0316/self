package onions.maven.test.self.repository;

import static org.junit.Assert.*;
import onions.maven.test.self.Application;
import onions.maven.test.self.domain.DomainFactory;
import onions.maven.test.self.domain.User;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
public class UserRepositoryTest {

	@Autowired
	private UserRepository userRepository;
	
	@Before
	public void before() {
		//userRepository.deleteAll();
	}
	
	@After
	public void after() {
		//userRepository.deleteAll();
	}
	
	@Test
	public void insert(){
		User u = DomainFactory.createUser();
		u.setCode("123");
		u = userRepository.save(u);
		assertTrue(u!=null);
	}
}
