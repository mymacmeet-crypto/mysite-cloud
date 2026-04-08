package com.mysite.core.models;

import javax.annotation.PostConstruct;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;

@Model(
    adaptables = SlingHttpServletRequest.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class LoginFormModel {

    private final SlingHttpServletRequest request;
    private boolean hasError;
    private String errorMessage;

    public LoginFormModel(SlingHttpServletRequest request) {
        this.request = request;
    }

    @PostConstruct
    protected void init() {
        String jReason = request.getParameter("j_reason");
        if (jReason != null && !jReason.isEmpty()) {
            hasError = true;
            switch (jReason) {
                case "INVALID_LOGIN":
                    errorMessage = "Invalid username or password.";
                    break;
                case "SESSION_TIMED_OUT":
                    errorMessage = "Your session has expired. Please sign in again.";
                    break;
                default:
                    errorMessage = "Login failed. Please try again.";
                    break;
            }
        }
    }

    public boolean isHasError() {
        return hasError;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
