package com.mysite.core.models;

import java.util.Collections;
import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.mysite.core.pojo.TableColumn;

@Model(adaptables = { Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class MagTableModel {

    @ValueMapValue
    private String tableTitle;

    @ValueMapValue
    private String tableSubtitle;

    @ValueMapValue
    private String cfEndpoint;

    @ChildResource(name = "columnItem")
    private List<TableColumn> columns;

    public String getTableTitle() {
        return tableTitle;
    }

    public String getTableSubtitle() {
        return tableSubtitle;
    }

    public String getCfEndpoint() {
        return cfEndpoint;
    }

    public List<TableColumn> getColumns() {
        return columns != null ? columns : Collections.emptyList();
    }

    public boolean isEmpty() {
        return columns == null || columns.isEmpty();
    }
}
