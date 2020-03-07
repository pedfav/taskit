package br.com.pedfav.taskitbackend.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Urgency {
    LOW, MEDIUM, HIGH, CRITICAL;
}
