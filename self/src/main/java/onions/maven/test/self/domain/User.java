package onions.maven.test.self.domain;

import java.util.Date;

import org.springframework.data.annotation.Id;

/**
 * 用户
 * @author Onions
 *
 */
public class User {
	@Id
	private String id;
	
	private String code;
	
	private String name;
	
	private String password;

	private Date createDate;

	private Date updateDate;

	public User(){
		Date now = new Date();
		this.createDate = now;
		this.updateDate = now;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	
	
}
